async function scshuffle()
{
    await toggleQueue();

    await retryPromise(async ()=>{
        await duplicateCurrent();
    },200,10);

    await scrollTrackList();

    await toggleShuffle();

    await toggleQueue();

    forwardSong();

    // //close the queue and open it again
    // toggleQueueButton.click();
    // toggleQueueButton.click();
    console.log("fully done");
}

// open the queue. if the queue is already open, will open it again. includes a wait time
// to ensure the queue is open
function toggleQueue()
{
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
    return new Promise((resolve,reject)=>{
        //open the 3 dot menu of the current song in the tracklist
        var currentSongMenu=document.querySelector(".m-active .queueItemView__more");

        if (!currentSongMenu)
        {
            reject();
            return;
        }

        currentSongMenu.click();

        //click the add to next up, duplicating the current song
        document.querySelector(".addToNextUp").click();

        setTimeout(()=>{
            resolve();
        },200);
    });
}

// the track list must be open and in view. attempts to scroll to the bottom
// of the track list and click the autoplay button
// function scrollTrackList2()
// {
//     var tracklist=document.querySelector(".queue__scrollableInner");

//     tracklist.scrollTop=tracklist.scrollHeight;

//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             console.log("scrolling");
//             var autoplaybutton=document.querySelector(".queueFallback__toggle label");

//             if (autoplaybutton)
//             {
//                 if (autoplaybutton.classList.contains("sc-toggle-active"))
//                 {
//                     autoplaybutton.click();
//                 }

//                 resolve();
//             }

//             else
//             {
//                 scrollTrackList(tracklist);
//             }
//         },300);
//     });
// }

//scroll to the end of the tracklist and ensure the autoplay button is off
async function scrollTrackList()
{
    var tracklist=document.querySelector(".queue__scrollableInner");

    await retryPromise(async ()=>{
        await new Promise((resolve,reject)=>{
            tracklist.scrollTop=tracklist.scrollHeight;

            setTimeout(()=>{
                var autoplaybutton=document.querySelector(".queueFallback__toggle label");

                if (autoplaybutton)
                {
                    if (autoplaybutton.classList.contains("sc-toggle-active"))
                    {
                        autoplaybutton.click();
                    }

                    resolve();
                    return;
                }

                else
                {
                    reject();
                }
            },300);
        });
    },200,5000);
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

async function retryPromise(tryFunction,delay=200,maxRetries=4,currentRetry=0)
{
    try
    {
        await tryFunction();
    }

    catch(e)
    {
        if (currentRetry>=maxRetries)
        {
            console.log("max retries");
            return;
        }

        await new Promise((resolve)=>{
            setTimeout(async ()=>{
                await retryPromise(tryFunction,delay,maxRetries,++currentRetry);
                resolve();
            },delay);
        });
    }
}

// click the forward button
function forwardSong()
{
    document.querySelector(".playControls__next").click();
}

scshuffle();