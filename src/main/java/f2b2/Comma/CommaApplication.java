package f2b2.Comma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CommaApplication {



	public static void main(String[] args) {

		SpringApplication.run(CommaApplication.class, args);

	}

}
