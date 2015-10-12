package cz.morosystems.czjug.web;

import de.matrixweb.jreact.JReact;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractCachingViewResolver;
import org.springframework.web.servlet.view.RedirectView;

import javax.annotation.PostConstruct;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.Locale;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
public class JsxViewResolver extends AbstractCachingViewResolver {

    private JReact renderer;
    private MessageFormat format;
    private static final  String COMMON_JS_PATH = "/dist/commons.js";
    private static final  String SERVER_HELPER_JS_PATH = "/WEB-INF/lib/ServerHelper.js";
    private static final  String WEBPACK_HELPER_JS_PATH = "/WEB-INF/lib/WebpackHelper.js";
    public static final String REDIRECT_URL_PREFIX = "redirect:/";
    public static final String FORWARD_URL_PREFIX = "forward:/";
    private static final String INDEX_FILE = "/WEB-INF/pages/view.html";
    //
    ScriptEngine engine = new ScriptEngineManager().getEngineByMimeType("application/javascript");



    @PostConstruct
    public void init() throws IOException{
        ClassPathResource commons = new ClassPathResource(COMMON_JS_PATH);
        ClassPathResource serverHelper = new ClassPathResource(SERVER_HELPER_JS_PATH);
        ClassPathResource webpackHelper = new ClassPathResource(WEBPACK_HELPER_JS_PATH);
        ClassPathResource res = new ClassPathResource(INDEX_FILE);
        format = new MessageFormat(IOUtils.toString(res.getInputStream()));
        try {
            engine.eval(new InputStreamReader(serverHelper.getInputStream()));
            engine.eval(new InputStreamReader(commons.getInputStream()));
            engine.eval(new InputStreamReader(webpackHelper.getInputStream()));
        } catch (ScriptException e) {
            e.printStackTrace();
        }
    }



    @Override protected View loadView(String viewName, Locale locale) throws Exception {
        String internalViewName = viewName;
        if(viewName.startsWith(REDIRECT_URL_PREFIX)) {
            internalViewName = viewName.substring(REDIRECT_URL_PREFIX.length());
            RedirectView view = new RedirectView(internalViewName, true, true);
            return view;
        }
        if(viewName.startsWith(FORWARD_URL_PREFIX)) {
            internalViewName = viewName.substring(FORWARD_URL_PREFIX.length());
            RedirectView view = new RedirectView(internalViewName, true, true);
            return view;

        }

        return new JsxView(engine,internalViewName,format);
    }
}
