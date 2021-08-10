CO_CONRAD.init = function(co)
{
    co.setPowerStars(3);
    co.setSuperpowerStars(3);
};
CO_CONRAD.activateSuperpower = function(co, powerMode)
{
	CO_CONRAD.activatePower(co, powerMode);
};
CO_CONRAD.getSuperPowerDescription = function()
{
    return CO_CONRAD.getPowerDescription();
};
CO_CONRAD.getSuperPowerName = function()
{
    return CO_CONRAD.getPowerName();
};
CO_CONRAD.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                             defender, defPosX, defPosY, isDefender, action)
{
    if (isDefender)
    {
        // return weak counter damage of conrad
        return -20;
    }
    var units = co.getOwner().getUnits();
    var visionCount = 0;
    for (var i = 0; i < units.size(); i++)
    {
        var unit = units.at(i);
        var x = unit.getX();
        var y = unit.getY();
        var distance = Math.abs(x - defPosX) + Math.abs(y - defPosY);
        if (distance <= unit.getVision(Qt.point(x, y)))
        {
            visionCount += 1;
        }
    }
    units.remove();
    switch (co.getPowerMode())
    {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
        case GameEnums.PowerMode_Power:
            return visionCount * 5 + 10;
        default:
            if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
            {
                return visionCount * 5 + 10;
            }
            break;
    }
    return visionCount * 1;
};

CO_CONRAD.getTrueDamage = function(co, damage, attacker, atkPosX, atkPosY, attackerBaseHp,
                              defender, defPosX, defPosY, isDefender, action)
{
    // return average luck as true damage
    return attackerBaseHp / 4;
};

CO_CONRAD.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked)
{
    if (gotAttacked === false && attacker.getOwner() === co.getOwner())
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Power:
                break;
            default:
                break;
        }
    }
};

CO_CONRAD.getVisionrangeModifier = function(co, unit, posX, posY)
{
    switch (co.getPowerMode())
    {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
        case GameEnums.PowerMode_Power:
            return 1;
        default:
            return 0;
    }
};
