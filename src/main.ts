import {
    NestFactory, Reflector, 
} from "@nestjs/core";
import {
    UserModule, 
} from "./modules/user.module";
import {
    ClassSerializerInterceptor, 
} from "@nestjs/common";
import {
    HttpExceptionFilter, 
} from "./filter/http-exception.filter";
import {
    AppModule, 
} from "./app.module";
// import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listen(3000);
}
bootstrap();
