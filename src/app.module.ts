import { Module } from '@nestjs/common';
import { UsersModule } from './modern/users/users.module';
import { CartService } from './services/cart.service';

@Module({
  imports: [UsersModule],
  providers: [CartService],
})
export class AppModule {}
