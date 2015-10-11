package cz.morosystems.czjug.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import cz.morosystems.czjug.domain.Partner;
import cz.morosystems.czjug.model.Model;
import cz.morosystems.czjug.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;

    private ObjectMapper mapper = new ObjectMapper();

    public String getPartner(Long id, Boolean editable) throws JsonProcessingException {
        if (id != null) {
            Model model = new Model();
            model.setData(partnerRepository.findOne(id));
            model.getState().setEditable(editable);
            return mapper.writeValueAsString(model);
        }
        return null;
    }

    public String getNewPartnerModel() throws JsonProcessingException {
        Model model = new Model();
        model.setData(new Partner());
        model.getState().setEditable(true);
        return mapper.writeValueAsString(model);
    }

    public String getPartnerListModel() throws JsonProcessingException {
        Model model = new Model();
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("partnerList", partnerRepository.findAll());
        model.setData(data);
        return mapper.writeValueAsString(model);
    }

}