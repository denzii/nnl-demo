export const pageview = (url:string) => {
    if (window !== undefined) {
        // @ts-ignore
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    }
  };
  
//   @ts-ignore
  export const event = ({ action, params }) => {
    if (window !== undefined) {
        // @ts-ignore
      window.gtag("event", action, params);
    }
  };