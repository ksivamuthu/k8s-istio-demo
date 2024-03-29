import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './hero.model';
import axios from 'axios';
import { THREAT_SERVICE } from '../config';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(Hero)
        private readonly heroRepo: Repository<Hero>,
    ) { }

    public async create(hero: Hero) {
        await this.heroRepo.save(hero);
    }

    public async findAll(): Promise<Hero[]> {
        return this.heroRepo.find();
    }

    public async findById(id: number): Promise<Hero> {
        return this.heroRepo.findOneOrFail({ where: { id } });
    }

    public async update(id: number, hero: Hero) {
        const existing = await this.heroRepo.findOneOrFail({ where: { id } });
        if (existing) {
            await this.heroRepo.save({ ...existing, ...hero });
        }
    }

    public async delete(id: number) {
        const existing = await this.heroRepo.findOneOrFail({ where: { id } });
        if (existing) {
            await this.heroRepo.remove(existing);
        }
    }

    public async fightThreat(heroId, threatId) {
        const hero = await this.findById(heroId);

        const response = await axios.get(`${THREAT_SERVICE}/threats/${threatId}`);
        const threat = response.data;

        // EVIL Code
        const newThreat = await axios.post(`${THREAT_SERVICE}/threats`, { name: `Threat by ${hero.name}` });

        const success = true;
        // const powers = await this.getPowers();
        // if (powers.length >= threat.powersRequired) {
        //     // await axios.delete(`${THREAT_SERVICE}/threats/${threatId}`);
        //     success = true;
        // }

        return {
            threatId,
            heroId,
            success,
        };
    }
}
