var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setAmmo1(1);
        unit.setMaxAmmo1(1);
        unit.setWeapon1ID("WEAPON_ANTI_SHIP_MISSILE");

        unit.setAmmo2(0);
        unit.setMaxAmmo2(0);
        unit.setWeapon2ID("");

        unit.setFuel(100);
        unit.setMaxFuel(100);
        unit.setBaseMovementPoints(6);
        unit.setMinRange(1);
        unit.setMaxRange(1);
		unit.setVision(2);
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // none neutral player
        unit.loadSprite("cannonboat", false);
        unit.loadSprite("cannonboat+mask", true);
    };
    this.getMovementType = function()
    {
        return "MOVE_BOAT";
    };
    this.getBaseCost = function()
    {
        return 6000;
    };
    this.getName = function()
    {
        return qsTr("Cannonboat");
    };
    this.startOfTurn = function(unit)
    {
        // pay unit upkeep
        var fuelCosts = 1 + unit.getFuelCostModifier(Qt.point(unit.getX(), unit.getY()), 1);
        if (fuelCosts < 0)
        {
            fuelCosts = 0;
        }
        unit.setFuel(unit.getFuel() - fuelCosts);
        UNIT.transporterRefilling(unit);
    };
    this.createExplosionAnimation = function(x, y)
    {
        var animation = GameAnimationFactory.createAnimation(x, y);
        animation.addSprite("explosion+water", -map.getImageSize() / 2, -map.getImageSize(), 0, 1.5);
        audio.playSound("explosion+water.wav");
        return animation;
    };
    this.doWalkingAnimation = function(action)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSprite(unitID + "+walk+mask", true, 1.5);
        animation.loadSprite(unitID + "+walk", false, 1.5);
        animation.setSound("moveship.wav", -2);
        return animation;
    };
    this.getLoadingPlace = function()
    {
        return 1;
    };
    this.getTransportUnits = function()
    {
        return ["INFANTRY", "MECH", "SNIPER"];
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.getTerrainAnimationBase = function(unit, terrain)
    {
        return "base_air";
    };

    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "fore_sea";
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "back_sea";
    };

    this.getDescription = function()
    {
        return qsTr("Naval Unit. Attacks naval units. <div c='00ff00'>Carries X 1<div c='ffffff'> infantry units.");
    };
}

Constructor.prototype = UNIT;
var CANNONBOAT = new Constructor();
