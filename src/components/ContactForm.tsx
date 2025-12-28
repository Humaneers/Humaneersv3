import { useEffect } from 'react';

export function ContactForm() {
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const initResizer = () => {
      // @ts-ignore
      if (window.iFrameResize) {
         const moxieFrame = document.getElementById("moxie-web-devs-website-form") as HTMLIFrameElement;
         if (moxieFrame) {
            // Only set src if it's empty to prevent reload loops if this effect runs multiple times (though dependency is empty array)
            if (!moxieFrame.src) {
                moxieFrame.src = 'https://hello.withmoxie.com/01/humaneers/web-devs-website-form?inFrame=true&sourceUrl=' + encodeURIComponent(window.location.href);
            }
            
            // @ts-ignore
            window.iFrameResize({
                heightCalculationMethod: 'min', 
                sizeWidth: true, 
                sizeHeight: true, 
                log: false, 
                checkOrigin: false
            }, '#moxie-web-devs-website-form');
         }
      }
    };

    if (!(window as any).iFrameResize) {
        script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.10/iframeResizer.min.js";
        script.async = true;
        script.onload = initResizer;
        document.body.appendChild(script);
    } else {
        // If script is already loaded, just init
        setTimeout(initResizer, 0);
    }

    const handleMessage = (event: MessageEvent) => {
        if(event.origin === 'https://hello.withmoxie.com' && typeof event.data === 'string' && event.data.startsWith('[Redirect]')){
            let url = event.data.slice(10);
            window.location.href = url;
        }
    };
    window.addEventListener("message", handleMessage, false);

    return () => {
        window.removeEventListener("message", handleMessage);
        
        const moxieFrame = document.getElementById("moxie-web-devs-website-form");
        // @ts-ignore
        if (moxieFrame && moxieFrame.iFrameResizer) {
            // @ts-ignore
            moxieFrame.iFrameResizer.close();
        }

        if(script && document.body.contains(script)) {
            document.body.removeChild(script);
        }
    }
  }, []);

  return (
    <div className="w-full min-h-[500px] bg-white">
      <iframe 
        id="moxie-web-devs-website-form" 
        // @ts-ignore
        allowtransparency="true" 
        style={{padding: 0, margin: 0, border: 0, maxWidth: '100%', minWidth: '100%'}}
      ></iframe>
    </div>
  );
}
