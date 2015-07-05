(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root['imagePreloaderQueue'] = factory();
    }
}(this, function () {
    'use strict';

    return function() {
        var loaded = [],
            errors = [],
            queue = [],
            currentImageSrc,
            currentImageObject,
            onItemErrorCallbacks = [],
            onBeforeItemLoadCallbacks = [],
            onAfterItemLoadCallbacks = [],
            onAfterItemCallbacks = [],
            onQueueLoadCallbacks = [],
            started = false
        ;

        /**
         * Adds images
         */
        function add() {
            var i, args = getArgsArray(arguments);

            for (i = 0; i < args.length; i++) {
                if (typeof args[i] !== 'string') {
                    throw new Error('ImagePreloaderQueue only accepts strings');
                }

                queue.push(args[i]);
            }
        }

        /**
         * Converts arguments to plain array
         * @param args
         * @returns {Array}
         */
        function getArgsArray(args) {
            args = Array.prototype.slice.call(args, 0);

            return args.reduce(function (carry, element) {
                if (Object.prototype.toString.call(element) === '[object Array]') {
                    carry = carry.concat(element);
                } else {
                    carry.push(element);
                }

                return carry;
            });
        }

        /*
         * Start and continue paused queue
         */
        function start() {
            // continue loading paused image
            if (currentImageObject && !isStarted()) {
                loadImage(currentImageSrc);
            // queue is empty
            } else if (loaded.length === 0 && queue.length === 0 && !currentImageSrc) {
                throw new Error('You must add images to queue');
            // all images were loaded
            } else if (queue.length === 0) {
                runCallbacks(onQueueLoadCallbacks);
            // start loading next image
            } else if (!isStarted()) {
                currentImageSrc = queue.splice(0, 1)[0];
                loadImage(currentImageSrc);
            }
        }

        /**
         *
         * @returns {boolean}
         */
        function isStarted() {
            return started;
        }

        /**
         * Load single image
         * @param src
         */
        function loadImage(src) {
            started = true;
            runCallbacks(onBeforeItemLoadCallbacks, [src]);
            currentImageObject = new Image();

            currentImageObject.onload = function () {
                onItemLoad(src);
            };

            currentImageObject.onerror = function () {
                onItemError(src, arguments[0]);
            };

            currentImageObject.src = src;
        }

        /**
         * Fires when images is loaded, executes callback, start next image
         * @param src
         */
        function onItemLoad(src) {
            runCallbacks(onAfterItemLoadCallbacks, [src]);
            runCallbacks(onAfterItemCallbacks, [src]);
            loaded.push(src);
            cleanUp();
            start();
        }

        /**
         * Fires when images failed to load, executes callback, start next image
         * @param src
         */
        function onItemError(src) {
            runCallbacks(onItemErrorCallbacks, [src]);
            runCallbacks(onAfterItemCallbacks, [src]);
            errors.push(src);
            cleanUp();
            start();
        }

        /**
         * Clear variables
         */
        function cleanUp() {
            currentImageObject = null;
            currentImageSrc = null;
            started = false;
        }

        /**
         * Pause queue
         */
        function pause() {
            started = false;

            if (currentImageObject) {
                currentImageObject.src = '';
            }
        }

        /**
         * Pause queue for {value} milliseconds
         * @param value
         */
        function pauseFor(value) {
            pause();
            setTimeout(start, value);
        }

        /**
         * Adds callback for failed load
         * @param fn
         */
        function addOnItemErrorCallbacks(fn) {
            onItemErrorCallbacks.push(fn);
        }

        /**
         * Adds callback for before loading
         * @param fn
         */
        function addOnBeforeItemLoadCallback(fn) {
            onBeforeItemLoadCallbacks.push(fn);
        }

        /**
         * Adds callback for after successful load
         * @param fn
         */
        function addOnAfterItemLoadCallback(fn) {
            onAfterItemLoadCallbacks.push(fn);
        }

        /**
         * Adds callback that is executed regardless of load status
         * @param fn
         */
        function addOnAfterItemCallback(fn) {
            onAfterItemCallbacks.push(fn);
        }

        /**
         * Adds callback for queue finish
         * @param fn
         */
        function addOnQueueLoadCallback(fn) {
            onQueueLoadCallbacks.push(fn);
        }

        /**
         * Return queue progress: number of finished loads / total items in queue
         * @returns {number}
         */
        function getProgress() {
            var processed = loaded.length + errors.length;
            return processed / (processed + queue.length);
        }

        /**
         * Runs array of callbacks with given arguments
         * @param callbacks
         * @param args
         */
        function runCallbacks(callbacks, args) {
            for (var i = 0; i < callbacks.length; i++) {
                if (typeof callbacks[i] !== 'function') continue;
                callbacks[i].apply(null, args);
            }
        }

        /**
         * Return list of loaded images
         * @returns {Array}
         */
        function getLoaded() {
            return loaded;
        }

        /**
         * Return list of queued images
         * @returns {Array}
         */
        function getQueue() {
            return queue;
        }

        return {
            add: add,
            start: start,
            pause: pause,
            pauseFor: pauseFor,
            onAfterItem: addOnAfterItemCallback,
            onItemError: addOnItemErrorCallbacks,
            onBeforeItemLoad: addOnBeforeItemLoadCallback,
            onAfterItemLoad: addOnAfterItemLoadCallback,
            onQueueLoad: addOnQueueLoadCallback,
            getProgress: getProgress,
            getLoaded: getLoaded,
            getQueue: getQueue,
            isStarted: isStarted
        };
    };
}));