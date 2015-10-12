package cz.morosystems.czjug.web;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.view.AbstractUrlBasedView;

import javax.script.ScriptEngine;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.Map;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
public class JsxView extends AbstractUrlBasedView {

    private ScriptEngine engine;
    private String viewName;
    private MessageFormat indexTemplate;

    private static final String  PREFIX = "/dist";
    private static final String SUFFIX = ".js";
    private static final String MODEL_VIEW = "model";


    public JsxView(ScriptEngine engine, String viewName, MessageFormat indexTemplate) {
        super(viewName);
        this.engine = engine;
        this.viewName = viewName;
        this.indexTemplate = indexTemplate;
    }

    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {


        if(viewName.equals(MODEL_VIEW)) {
           IOUtils.write("window.app = window.app === undefined ?{}: window.app; window.app.model = "+model.get("model")+";", response.getOutputStream());

        } else {
            ClassPathResource view = new ClassPathResource(PREFIX + "/" + viewName + SUFFIX);
            Object result = engine.eval(new InputStreamReader(view.getInputStream()));
            String content = (String)engine.eval("window." + viewName + "Content");
            IOUtils.write(indexTemplate.format(new String[] { viewName, content, (String)model.get("modelUrl") }),
                    response.getOutputStream());
        }
    }
}
