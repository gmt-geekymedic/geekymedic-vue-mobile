import { Observable, ReplaySubject } from "rxjs";

/**
 * 延迟加载第三方类库(返回Observable)
 */
class Lazy {
  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

  /**
   * 加载js
   */
  loadScript(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };
    script.onerror = error => {
      this._loadedLibraries[url].error(error);
    };
    document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }

  /**
   * 加载css
   */
  loadStyle(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const style = document.createElement("link");
    style.type = "text/css";
    style.href = url;
    style.rel = "stylesheet";
    style.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };
    style.onerror = error => {
      this._loadedLibraries[url].error(error);
    };
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(style);

    return this._loadedLibraries[url].asObservable();
  }
}
export default new Lazy();
