package com.erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.erp", "com.company.erp"})
@EnableJpaRepositories(basePackages = {"com.erp.repository", "com.company.erp.crm.repository"})
@EntityScan(basePackages = {"com.erp.model", "com.company.erp.crm.model"})
public class ErpBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErpBackendApplication.class, args);
	}

}
