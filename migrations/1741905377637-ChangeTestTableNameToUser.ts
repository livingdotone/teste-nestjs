import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTestTableNameToUser1741904952293
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teste" RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "teste"`);
  }
}
