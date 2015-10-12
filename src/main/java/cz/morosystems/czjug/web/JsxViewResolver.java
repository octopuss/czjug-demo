package cz.morosystems.czjug.web;

import de.matrixweb.jreact.JReact;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractCachingViewResolver;

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
    public static final String REDIRECT_URL_PREFIX = "redirect:/";
    public static final String FORWARD_URL_PREFIX = "forward:/";

    //
    ScriptEngine engine = new ScriptEngineManager().getEngineByMimeType("application/javascript");

    private String indexFile = "/WEB-INF/pages/view.html";

    @PostConstruct
    public void init() throws IOException{
        ClassPathResource commons = new ClassPathResource(COMMON_JS_PATH);
        ClassPathResource res = new ClassPathResource(indexFile);
        format = new MessageFormat(IOUtils.toString(res.getInputStream()));
        try {
            engine.eval("var window = window || {};\n" +
                    "window.app = {};\n" +
                    "window.app.model = {};" +
                            "window.app.model.data = {};" +
                            "window.app.model.state = {};" +
                    "if (typeof console == \"undefined\") {\n" +
                    "    console = {\n" +
                    "        log: function (arg) {println(arg)},\n" +
                    "        error: function (arg) {println(arg)}\n" +
                    "    };\n" +
                    "}"
                    );

            engine.eval(new InputStreamReader(commons.getInputStream()));
            engine.eval("if (typeof webpackJsonp == \"undefined\") {\n" +
                    "       webpackJsonp = window['webpackJsonp'];\n" +
                    "}");
        } catch (ScriptException e) {
            e.printStackTrace();
        }
    }



    @Override protected View loadView(String viewName, Locale locale) throws Exception {
        String internalViewName = viewName;
        if(viewName.startsWith(REDIRECT_URL_PREFIX)) {
            internalViewName = viewName.substring(REDIRECT_URL_PREFIX.length());
        }
        if(viewName.startsWith(FORWARD_URL_PREFIX)) {
            internalViewName = viewName.substring(FORWARD_URL_PREFIX.length());

        }

        return new JsxView(engine,internalViewName,format);
    }
}
