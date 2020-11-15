class AlloyRecipe {

    private static data: {inputs: LiquidInstance[], result: LiquidInstance}[] = [];

    static addRecipe(result: LiquidInstance, ...inputs: LiquidInstance[]): void {
        result.amount /= 1000;
        this.data.push({inputs: inputs.map(input => ({liquid: input.liquid, amount: input.amount})), result: result});
    }

    static alloyAlloys(liquids: {[key: string]: number}, liquidStorage: any): void {
        this.data.forEach(recipe => {
            if(recipe.inputs.every(input => liquids[input.liquid] >= input.amount)){
                recipe.inputs.forEach(input => {
                    liquidStorage.getLiquid(input.liquid, input.amount);
                });
                liquidStorage.addLiquid(recipe.result.liquid, recipe.result.amount);
            }
        });
    }

}


AlloyRecipe.addRecipe({liquid: "molten_obsidian", amount: 36}, {liquid: "water", amount: 125}, {liquid: "lava", amount: 125});
AlloyRecipe.addRecipe({liquid: "molten_clay", amount: 144}, {liquid: "water", amount: 250}, {liquid: "molten_stone", amount: 72}, {liquid: "molten_dirt", amount: 144});
AlloyRecipe.addRecipe({liquid: "molten_pigiron", amount: 144}, {liquid: "molten_iron", amount: 144}, {liquid: "blood", amount: 40}, {liquid: "molten_clay", amount: 72});
AlloyRecipe.addRecipe({liquid: "molten_knightslime", amount: 72}, {liquid: "molten_iron", amount: 72}, {liquid: "purpleslime", amount: 125}, {liquid: "molten_stone", amount: 144});
AlloyRecipe.addRecipe({liquid: "molten_manyullyn", amount: 2}, {liquid: "molten_cobalt", amount: 2}, {liquid: "molten_ardite", amount: 2});
AlloyRecipe.addRecipe({liquid: "molten_bronze", amount: 4}, {liquid: "molten_copper", amount: 3}, {liquid: "molten_tin", amount: 1});
AlloyRecipe.addRecipe({liquid: "molten_alubrass", amount: 4}, {liquid: "molten_copper", amount: 1}, {liquid: "molten_aluminum", amount: 3});
AlloyRecipe.addRecipe({liquid: "molten_electrum", amount: 2}, {liquid: "molten_gold", amount: 1}, {liquid: "molten_silver", amount: 1});