async function scshuffle()
{
    //this button toggles the queue
    var toggleQueueButton=document.querySelector(".playbackSoundBadge__showQueue");

    //open the queue
    toggleQueueButton.click();

    //if the queue is not yet open because the previous click closed it, open it again
    if (!document.querySelector(".playbackSoundBadge").classList.contains("m-queueVisible"))
    {
        toggleQueueButton.click();
    }

    //open the 3 dot menu of the current song in the tracklist
    document.querySelector(".m-active .queueItemView__more").click();
    //click the add to next up, duplicating the current song
    document.querySelector(".addToNextUp").click();

    var tracklist=document.querySelector(".queue__scrollableInner");

    //scroll to bottom of tracklist and click autoplay button
    await scrollTrackList(tracklist);

    //click shuffle button
    var shufflebutton=document.querySelector(".shuffleControl");
    shufflebutton.click();

    //if shuffle button was already clicked and is now off, click it again
    if (!shufflebutton.classList.contains("m-shuffling"))
    {
        shufflebutton.click();
    }

    //close the queue and open it again
    toggleQueueButton.click();
    toggleQueueButton.click();
    console.log("done");
}

function scrollTrackList(tracklist)
{
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