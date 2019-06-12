var Constructor = function()
{
    this.init = function(co)
    {
        co.setPowerStars(3);
        co.setSuperpowerStars(3);
    };

    this.activatePower = function(co)
    {

        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(unit.getX(), unit.getY());
            if (animations.length < 5)
            {
                animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, globals.randInt(0, 400));
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();

        audio.clearPlayList();
        CO_MINAMOTO.loadCOMusic(co);
        audio.playRandom();
    };

    this.activateSuperpower = function(co, powerMode)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(unit.getX(), unit.getY());
            if (animations.length < 5)
            {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 1.5, globals.randInt(0, 400));
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 1.5);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();

        audio.clearPlayList();
        CO_MINAMOTO.loadCOMusic(co);
        audio.playRandom();
    };

    this.loadCOMusic = function(co)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/power.mp3");
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/superpower.mp3");
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/tagpower.mp3");
                break;
            default:
                audio.addMusic("resources/music/cos/minamoto.mp3")
                break;
        }
    };

    this.getCOUnitRange = function(co)
    {
        return 4;
    };
    this.getCOArmy = function()
    {
        return "GS";
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender)
    {
        var nearMountains = false;
        var fields = globals.getCircle(0, 2);
        for (var i = 0; i < fields.size(); i++)
        {
            var x = fields.at(i).x + atkPosX;
            var y = fields.at(i).y + atkPosY;
            if (map.onMap(x, y))
            {
                if (map.getTerrain(x, y).getID() === "MOUNTAIN")
                {
                    nearMountains = true;
                    break;
                }
            }
        }

        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                if (nearMountains === true)
                {
                    return 40;
                }
                else
                {
                    return 0;
                }
            case GameEnums.PowerMode_Power:
                if (nearMountains === true)
                {
                    return 40;
                }
                else
                {
                    return 0;
                }
            default:
                if (nearMountains === true)
                {
                    if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker))
                    {

                        return 35;
                    }
                }
                break;
        }
        return 0;
    };
    this.getMovementpointModifier = function(co, unit, posX, posY)
    {
        if (co.getPowerMode() === GameEnums.PowerMode_Superpower ||
            co.getPowerMode() === GameEnums.PowerMode_Tagpower)
        {
            return 2;
        }
        return 0;
    };
    this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked)
    {
        if (gotAttacked === false)
        {
            // here begins the fun :D
            var blowRange = 0;
            switch (co.getPowerMode())
            {
                case GameEnums.PowerMode_Tagpower:
                case GameEnums.PowerMode_Superpower:
                    if (atkDamage >= 3.5)
                    {
                        blowRange = 4;
                    }
                    break;
                case GameEnums.PowerMode_Power:
                    if (atkDamage >= 4.5)
                    {
                        blowRange = 2;
                    }
                    break;
                default:
                    break;
            }
            var distX = defender.getX() - attacker.getX();
            var distY = defender.getY() - attacker.getY();
            var distance = Math.abs(distX) + Math.abs(distY);
            if (defender.getHp() > 0 && blowRange > 0 && distance === 1)
            {
                var newPosition = Qt.point(defender.getX(), defender.getY());
                // find blow away position
                for (var i = 1; i <= blowRange; i++)
                {
                    var testPosition = Qt.point(defender.getX() + distX * i, defender.getY() + distY * i);
                    if (map.onMap(testPosition.x, testPosition.y))
                    {
                        var terrain = map.getTerrain(testPosition.x, testPosition.y);
                        if (terrain.getUnit() === null &&
                            defender.canMoveOver(testPosition.x, testPosition.y) === true)
                        {
                            newPosition = testPosition;
                        }
                        else
                        {
                            break;
                        }
                    }
                }
                // blow unit away
                defender.moveUnitToField(newPosition.x, newPosition.y);
            }
        }
    };

    // CO - Intel
    this.getBio = function()
    {
        return qsTr("A skilled but arrogant CO and a master swordsman who grew up in the mountains of Golden Sun.");
    };
    this.getHits = function()
    {
        return qsTr("Rice Cakes");
    };
    this.getMiss = function()
    {
        return qsTr("Mackerel");
    };
    this.getCODescription = function()
    {
        return qsTr("Units near mountains have increased firepower.");
    };
    this.getPowerDescription = function()
    {
        return qsTr("Direct units can blow lighter enemies away when attacking.");
    };
    this.getPowerName = function()
    {
        return qsTr("Wind Blade");
    };
    this.getSuperPowerDescription = function()
    {
        return qsTr("Unit movement is increased by two, and large direct units blow enemies away.");
    };
    this.getSuperPowerName = function()
    {
        return qsTr("Storm Blades");
    };
    this.getPowerSentences = function()
    {
        return [qsTr("Clear a path! We shall not stop for any man!"),
                qsTr("You fight skillfully... But I fight flawlessly!"),
                qsTr("Are you familiar with the taste of steel? You shall be soon!"),
                qsTr("Hm hm hm... Are you trying to mock me, or is this truly your best effort?"),
                qsTr("Mountain winds, hone my blade... and scatter my enemies!"),
                qsTr("Begone! I do not have time to waste on peons such as yourself!")];
    };
    this.getVictorySentences = function()
    {
        return [qsTr("Hm hm hm! Perhaps next time I should use a wooden sword?"),
                qsTr("The battle has ended. Yield now, or suffer for this insolence."),
                qsTr("Hm hm hm... I can't fault you for having tried!")];
    };
    this.getDefeatSentences = function()
    {
        return [qsTr("My Emperor... I have failed you..."),
                qsTr("I underestimated your skill, nothing more!")];
    };
    this.getName = function()
    {
        return qsTr("Minamoto");
    };
}

Constructor.prototype = CO;
var CO_MINAMOTO = new Constructor();
