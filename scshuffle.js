async function scshuffle()
{
    await toggleQueue();

    await duplicateCurrent();

    await scrollTrackList();

    await toggleShuffle();

    await toggleQueue();

    // //close the queue and open it again
    // toggleQueueButton.click();
    // toggleQueueButton.click();
    console.log("done");
}

// open the queue. if the queue is already open, will open it again. includes a wait time
// to ensure the queue is open
function toggleQueue()
{
    console.log("toggling queue");
    return new Promise((resolve)=>{
        //this button toggles the queue
        var toggleQueueButton=document.querySelector(".playbackSoundBadge__showQueue");

        //open the queue
        toggleQueueButton.click();

        //if the queue is not yet open because the previous click closed it, open it again
        if (!document.querySelector(".playbackSoundBadge").classList.contains("m-queueVisible"))
        {
            setTimeout(()=>{
                toggleQueueButton.click();
            },200);
        }

        setTimeout(()=>{
            resolve();
        },500);
    });
}

// the queue must be open and the current song must be in view.
// duplicates the currently selected song.
function duplicateCurrent()
{
    return new Promise((resolve)=>{
        //open the 3 dot menu of the current song in the tracklist
        document.querySelector(".m-active .queueItemView__more").click();
        //click the add to next up, duplicating the current song
        document.querySelector(".addToNextUp").click();

        setTimeout(()=>{
            resolve();
        },200);
    });
}

// the track list must be open and in view. attempts to scroll to the bottom
// of the track list and click the autoplay button
function scrollTrackList()
{
    var tracklist=document.querySelector(".queue__scrollableInner");

    tracklist.scrollTop=tracklist.scrollHeight;

    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("scrolling");
            var autoplaybutton=document.querySelector(".queueFallback__toggle label");

            if (autoplaybutton)
            {
                if (autoplaybutton.classList.contains("sc-toggle-active"))
                {
                    autoplaybutton.click();
                }

                resolve();
            }

            else
            {
                scrollTrackList(tracklist);
            }
        },300);
    });
}

// shuffle button must be in view. engages shuffle, flipping it if it was
// already on.
function toggleShuffle()
{
    return new Promise((resolve)=>{
        var shufflebutton=document.querySelector(".shuffleControl");
        shufflebutton.click();

        if (!shufflebutton.classList.contains("m-shuffling"))
        {
            shufflebutton.click();
        }

        setTimeout(()=>{
            resolve();
        },500);
    });
}