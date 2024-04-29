import {
    exec, 
} from "child_process";
import {
    promisify, 
} from "util";
import {
    PostgreSqlContainer,
} from "@testcontainers/postgresql";
import {
    PrismaService, 
} from "../apps/adaptor/out/persistence/prisma.service";

const execAsync = promisify(exec);

async function setupTestContainers() {
    const container = await new PostgreSqlContainer().start();

    return {
        host: container.getHost(),
        port: container.getMappedPort(5432),
        database: container.getDatabase(),
        user: container.getUsername(),
        password: container.getPassword(),
    };
}

export async function setupPrismaService() {
    // Pg Test Container 시작
    const connectionConfig = await setupTestContainers();

    // Container 가 가지는 db 주소를 반환
    const databaseUrl = `postgresql://${connectionConfig.user}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`;

    // 스크립트 실행을 통해 DB Container에 우리가 지정한 prisma model로 migrate 진행
    await execAsync(
        `DATABASE_URL=${databaseUrl} npx prisma migrate deploy --preview-feature`
    );

    // DB Container와 연결되는 Prisma Service를 반환
    return new PrismaService({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });
}