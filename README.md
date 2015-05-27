#Image load queue

Create images preload queue, pause it and restart it.

```js
var images = [
    'https://farm9.staticflickr.com/8517/8400604049_5ddaa2d1ab_h.jpg',
    'https://farm9.staticflickr.com/8369/8397734127_de5c5370e1_h.jpg',
];

queue = imagePreloaderQueue();

queue.add(images);

queue.onQueueLoad(function () {
    var srcList = queue.getLoaded();
    // do something with loaded images
});
```

### Methods

#### add

Add images to queue.

```js
queue.add(['http://example.com/image1.jpg', 'http://example.com/image2.jpg']);
queue.add('http://example.com/image3.jpg', 'http://example.com/image4.jpg');
queue.add(]'http://example.com/image5.jpg', 'http://example.com/image6.jpg'], 'http://example.com/image7.jpg');
```

#### start

Start/resume loading images.

#### pause

Pause loading.

#### pauseFor

Pause loading for X milliseconds.

```js
queue.pauseFor(1000); // Pause for 1 second
```

#### onAfterItem

Callback function that is fired and image is process - either success or error.

```js
queue.onAfterItem(function (src) {
    console.log(src);
}); 
```

#### onItemError

Callback function that is fired if image failed to load.

```js
queue.onItemError(function (src) {
    console.log('Error: ' + src);
}); 
```

#### onBeforeItemLoad

Callback function that is fired before image start to load.

```js
queue.onBeforeItemLoad(function (src) {
    console.log('Loading: ' + src);
}); 
```

#### onAfterItemLoad

Callback function that is fired after image is successfuly loaded.

```js
queue.onBeforeItemLoad(function (src) {
    jQuery('BODY').append('<img src="' + src + '" alt="">');
}); 
```

#### onQueueLoad

Callback function that is fired after all queue is process - including unsuccessful images.

```js
queue.onQueueLoad(function () {
    console.log(queue.getLoaded());
}); 
```

#### getProgress

Progress = number of processed images / total number of images. This show progress in number of loaded images, not bytes loaded.

jQuery('#progress').text(Math.round(queue.getProgress() * 100) + '%');

queue.getProgress(function () {
    console.log(queue.getLoaded());
});

#### getLoaded

Returns array of loaded files at given moment.

#### getQueue

Returns array of queued files at given moment.

#### isStarted

Returns true if queue was started, false if it wasn't started or was paused. 

## TODO

Add more tests. 