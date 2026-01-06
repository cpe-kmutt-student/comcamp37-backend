import { Module } from '@nestjs/common';
import { TestAuthController } from './test-auth.controller';

@Module({
  controllers: [TestAuthController]
})
export class TestAuthModule {}
