package cz.morosystems.czjug.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
@Entity
public class Partner implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private Date birthDate;

    private String birthNr;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getBirthNr() {
        return birthNr;
    }

    public void setBirthNr(String birthNr) {
        this.birthNr = birthNr;
    }
}