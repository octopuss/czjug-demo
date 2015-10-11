package cz.morosystems.czjug.web;

import de.matrixweb.jreact.JReact;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.view.AbstractView;

import javax.script.ScriptEngine;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.Map;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
public class JsxView extends AbstractView {

    private ScriptEngine engine;
    private String viewName;
    private MessageFormat indexTemplate;

    public JsxView(ScriptEngine engine, String viewName, MessageFormat indexTemplate) {
        this.engine = engine;
        this.viewName = viewName;
        this.indexTemplate = indexTemplate;
    }

    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        ClassPathResource view = new ClassPathResource(viewName);
        String content = (String) engine.eval(new InputStreamReader(view.getInputStream()));
        IOUtils.write(indexTemplate.format(new String[]{content}), response.getOutputStream());
    }
}
