package com.jaydandowler.propfolio.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jaydandowler.propfolio.models.Property;

@Repository
public interface PropertyRepository extends CrudRepository<Property, Long> {
            // this method retrieves all the Properties from the database
            List<Property> findAll();
            
            List<Property> findByUserId(Long userId);
}
