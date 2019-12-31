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

        chrome.tabs.executeScript(tabs[0].id,{file:"test.js"});
        window.close();
    });
}