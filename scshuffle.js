function main()
{
    //this button toggles the queue
    var toggleQueueButton=document.querySelector(".playbackSoundBadge__showQueue");

    toggleQueueButton.click();

    if (!document.querySelector(".playbackSoundBadge").classList.contains("m-queueVisible"))
    {
        toggleQueueButton.click();
    }

    //open the 3 dot menu of the current song in the tracklist
    document.querySelector(".m-active .queueItemView__more").click();
    //click the add to next up, duplicating the current song
    document.querySelector(".addToNextUp").click();
}

main();