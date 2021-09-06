import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/resources/users/users.module';
import { TypeOrmConnectionModule } from '../../src/repositories/implementation/typeorm/typeorm-connection';
import { TestUtils } from '../utils/test.utils';
import { User } from '../../src/resources/users/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  const clearAllEntities = async () => {
    await testUtils.cleanAll([User]);
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeOrmConnectionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testUtils = new TestUtils();
    clearAllEntities();
  });

  afterEach(async () => {
    clearAllEntities();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Load Module', () => {
    expect(app).toBeDefined();
  });

  describe('/POST users', () => {
    it('should be able to create a new user', async () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Jhon Doe1',
          email: 'jhon.doe1@domain',
          password: '123456',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it('should not be able to create a new user with an existente email', async () => {
      const data = {
        name: 'Jhon Doe1',
        email: 'jhon.doe1@domain',
        password: '123456',
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      return request(app.getHttpServer())
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422);
    });
  });
});
