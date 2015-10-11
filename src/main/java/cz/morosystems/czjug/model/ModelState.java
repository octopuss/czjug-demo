package cz.morosystems.czjug.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
public class ModelState {

    private List<Object> messages = new ArrayList<Object>();

    private Boolean valid = false;

    private Boolean editable = true;

    public List<Object> getMessages() {
        return messages;
    }

    public void setMessages(List<Object> messages) {
        this.messages = messages;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Boolean getEditable() {
        return editable;
    }

    public void setEditable(Boolean editable) {
        this.editable = editable;
    }
}
