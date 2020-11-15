class ToolStats {

    durability: number;
    level: number;
    attack: number;
    speed: number;

    constructor(){
        this.durability = this.level = this.attack = this.speed = 0;
    }

    //call this first
    head(...materials: string[]): void {
        const length = materials.length;
        this.durability = this.level = this.attack = this.speed = 0;
        let stats: HeadStats;
        for(let i = 0; i < length; i++){
            stats = Material[materials[i]].getHeadStats();
            this.durability += stats.durability;
            this.attack += stats.attack;
            this.speed += stats.speed;
            if(stats.level > this.level){
                this.level = stats.level;
            }
        }
        this.durability = Math.max(1, this.durability / length | 0);
        this.attack /= length;
        this.speed /= length;
    }

    //call this second
    extra(...materials: string[]): void {
        const length = materials.length;
        let stats: ExtraStats;
        let dur = 0;
        for(let i = 0; i < length; i++){
            stats = Material[materials[i]].getExtraStats();
            dur += stats.durability;
        }
        this.durability += Math.round(dur / length);
    }

    //call this last
    handle(...materials: string[]): void {
        const length = materials.length;
        let stats: HandleStats;
        let dur = 0;
        let mod = 0;
        for(let i = 0; i < length; i++){
            stats = Material[materials[i]].getHandleStats();
            dur += stats.durability;
            mod += stats.modifier;
        }
        mod /= length;
        this.durability = Math.round(this.durability * mod);
        this.durability += Math.round(dur / length);
        this.durability = Math.max(1, this.durability);
    }

    getToolMaterial(): ToolAPI.ToolMaterial {
        return {
            durability: Math.round(this.durability),
            level: this.level,
            damage: this.attack,
            efficiency: this.speed
        };
    }

}