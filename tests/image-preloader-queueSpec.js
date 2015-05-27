describe('Image preloader queue', function() {
    var queue;
    var images = [
        'https://farm9.staticflickr.com/8517/8400604049_5ddaa2d1ab_h.jpg',
        'https://farm9.staticflickr.com/8369/8397734127_de5c5370e1_h.jpg',
        'https://farm9.staticflickr.com/8197/8175452800_56572cb25e_h.jpg'
    ];

    beforeEach(function() {
        queue = imagePreloaderQueue();
    });

    it('should not start without added images', function() {
        expect(function () {
            queue.start();
        }).toThrow(new Error('You must add images to queue'));
    });

    it('should add array', function() {
        queue.add(['test', 'test']);
        expect(queue.getQueue().length).toEqual(2);
    });

    it('should add mixed agrgs', function() {
        queue.add(['test', 'test'], 'test', ['test']);
        expect(queue.getQueue().length).toEqual(4);
    });

    it('should not exept non-string values', function() {
        expect(function () {
            queue.add(1)
        }).toThrow(new Error('ImagePreloaderQueue only accepts strings'));

        expect(function () {
            queue.add({})
        }).toThrow(new Error('ImagePreloaderQueue only accepts strings'));
    });

    it('should start', function () {
        queue.add(images);
        queue.start();
        expect(queue.isStarted()).toEqual(true);
    });

    it('should pause', function () {
        queue.add(images);
        queue.start();
        queue.pause();
        expect(queue.isStarted()).toEqual(false);
    });

    //it('should call success callback', function () {
    //    queue.add([images[0]]);
    //
    //    queue.onAfterItemLoad(function (src) {
    //        expect(src).toEqual(images[0]);
    //    });
    //
    //    queue.start();
    //});
});