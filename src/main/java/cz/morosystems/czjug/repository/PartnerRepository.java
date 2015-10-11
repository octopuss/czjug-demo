package cz.morosystems.czjug.repository;

import cz.morosystems.czjug.domain.Partner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by ivan.dolezal.ext on 11.10.2015.
 */
@Repository
public interface PartnerRepository extends CrudRepository<Partner, Long> {

}