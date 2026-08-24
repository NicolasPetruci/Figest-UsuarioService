import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(dto: any) {
    const user = await this.usersService.create(dto);
    return this.generateTokens(user.id);
  }

  async login(dto: any) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    
    return this.generateTokens(user.id);
  }

  async generateTokens(userId: string) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);
    
    // Generate refresh token (7 days)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(token: string) {
    const record = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    
    if (!record || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    try {
      this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Optional: delete old refresh token
    await this.prisma.refreshToken.delete({ where: { token } });

    return this.generateTokens(record.userId);
  }
}
