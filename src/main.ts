import {
    NestFactory, Reflector, 
} from "@nestjs/core";
import {
    UserModule, 
} from "./modules/user.module";
import {
    ClassSerializerInterceptor, 
} from "@nestjs/common";
// import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(UserModule);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listen(3000);
}
bootstrap();
