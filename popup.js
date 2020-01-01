window.onload=main;

function main()
{
    chrome.tabs.query({
        active:true,
        currentWindow:true,
        url:"https://soundcloud.com/*"
    },(tabs)=>{
        if (!tabs.length)
        {
            return;
        }

        document.querySelector(".message").textContent="Shuffling...";

        chrome.tabs.executeScript(tabs[0].id,{file:"scshuffle.js"},(result)=>{
            window.close();
        });
    });
}