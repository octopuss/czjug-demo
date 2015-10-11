package cz.morosystems.czjug.web;

import de.matrixweb.jreact.JReact;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import javax.annotation.PostConstruct;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.Collections;
import java.util.Locale;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
public class JsxViewResolver implements ViewResolver {

    private JReact renderer;
    private MessageFormat format;
    String prefix = "/dist";


    //
    ScriptEngine engine = new ScriptEngineManager().getEngineByMimeType("application/javascript");

    private String indexFile = "/WEB-INF/pages/view.html";

    @PostConstruct
    public void init() throws IOException{
        ClassPathResource commons = new ClassPathResource(prefix+"/commons.js");
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

    @Override
    public View resolveViewName(String viewName, Locale locale) throws Exception {
       return new JsxView(engine,viewName,format);
    }
}
