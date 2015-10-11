package cz.morosystems.czjug.model;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
public class Model {

    private Object data = new Object();

    private ModelState state = new ModelState();

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public ModelState getState() {
        return state;
    }

    public void setState(ModelState state) {
        this.state = state;
    }

}
