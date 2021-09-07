import { Injectable } from '@nestjs/common';
import { Connection, getConnection, getRepository } from 'typeorm';

import * as Path from 'path';
import * as fs from 'fs';

/**
 * This class is used to support database
 * tests with unit tests in NestJS.
 *
 * This class is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
 */
@Injectable()
export class TestUtils {
  testConnection: Connection;
  environment: string;

  /**
   * Creates an instance of TestUtils
   */
  constructor() {
    console.log('current env test.utils: ', process.env.NODE_ENV);

    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
    this.testConnection = getConnection('test');
    this.environment = process.env.NODE_ENV;
  }

  /**
   * Shutdown the http server
   * and close database connections
   */
  async shutdownServer(server) {
    await server.httpServer.close();
    await this.closeDbConnection();
  }

  /**
   * Closes the database connections
   */
  async closeDbConnection() {
    const connection = await this.testConnection;
    if (connection.isConnected) {
      await (await this.testConnection).close();
    }
  }

  /**
   * Returns the entities of the database
   */
  async getEntities() {
    const entities = [];
    (await (await this.testConnection).entityMetadatas).forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );
    return entities;
  }

  /**
   * Cleans the database and reloads the entries
   */
  async reloadFixtures() {
    const entities = await this.getEntities();
    await this.cleanAllEntities(entities);
    await this.loadAll(entities);
  }

  /**
   * Cleans all the entities
   */
  async cleanAllEntities(entities) {
    try {
      for (const entity of entities) {
        const repository = await getRepository(entity, this.environment);
        const tableName = repository.metadata.tableName;
        await repository.query(`DELETE FROM ${tableName};`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  /**
   * Insert the data from the src/test/fixtures folder
   */
  async loadAll(entities) {
    try {
      for (const entity of entities) {
        const repository = await this.testConnection.getRepository(entity.name);
        const fixtureFile = Path.join(
          __dirname,
          `../test/fixtures/${entity.name}.json`,
        );
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
      );
    }
  }
}
