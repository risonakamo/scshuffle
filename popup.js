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

        chrome.scripting.executeScript(
            {
                files:["scshuffle.js"],
                target:{
                    tabId:tabs[0].id,
                }
            },
            (result)=>{
                window.close();
            }
        );
    });
}