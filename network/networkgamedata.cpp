#include <QJsonArray>

#include "network/networkgamedata.h"
#include "network/JsonKeys.h"
#include "coreengine/gameconsole.h"

bool NetworkGameData::hasOpenPlayers()
{
    return (m_players < m_maxPlayers);
}

const QString &NetworkGameData::getSlaveAddress() const
{
    return m_slaveAddress;
}

void NetworkGameData::setSlaveAddress(const QString &newAddress)
{
    m_slaveAddress = newAddress;
}

quint16 NetworkGameData::getSlavePort() const
{
    return m_slavePort;
}

void NetworkGameData::setSlavePort(quint16 newPort)
{
    m_slavePort = newPort;
}

QJsonObject NetworkGameData::toJson() const
{
    CONSOLE_PRINT("NetworkGameData::toJson", GameConsole::eDEBUG);
    QJsonObject obj;
    obj.insert(JsonKeys::JSONKEY_JOINEDPLAYERS, m_players);
    obj.insert(JsonKeys::JSONKEY_MAXPLAYERS, m_maxPlayers);
    obj.insert(JsonKeys::JSONKEY_GAMEDESCRIPTION, m_description);
    obj.insert(JsonKeys::JSONKEY_MAPNAME, m_mapName);
    obj.insert(JsonKeys::JSONKEY_SLAVENAME, m_slaveName);
    obj.insert(JsonKeys::JSONKEY_HASPASSWORD, m_locked);
    obj.insert(JsonKeys::JSONKEY_UUID, QString::number(m_uuid));
    obj.insert(JsonKeys::JSONKEY_CURRENTPLAYER, m_currentPlayer);
    QJsonObject mods;
    for (qint32 i = 0; i < m_Mods.size(); ++i)
    {
        mods.insert(JsonKeys::JSONKEY_MOD + QString::number(i), m_Mods[i]);
    }
    obj.insert(JsonKeys::JSONKEY_USEDMODS, mods);
    obj.insert(JsonKeys::JSONKEY_RUNNINGGAME, m_runningGame || m_launched);

    CONSOLE_PRINT("Adding players to slavegame " + m_slaveName, GameConsole::eDEBUG);
    QJsonArray usernames;
    for (qint32 i = 0; i < m_playerNames.size(); ++i)
    {
        CONSOLE_PRINT("user: " + m_playerNames[i], GameConsole::eDEBUG);
        usernames.push_back(m_playerNames[i]);
    }
    obj.insert(JsonKeys::JSONKEY_USERNAMES, usernames);
    return obj;
}

void NetworkGameData::fromJson(const QJsonObject & obj)
{
    m_players = obj.value(JsonKeys::JSONKEY_JOINEDPLAYERS).toInt();
    m_maxPlayers = obj.value(JsonKeys::JSONKEY_MAXPLAYERS).toInt();
    QJsonObject mods = obj.value(JsonKeys::JSONKEY_USEDMODS).toObject();
    for (const auto & mod : mods)
    {
        m_Mods.append(mod.toString());
    }
    m_description = obj.value(JsonKeys::JSONKEY_GAMEDESCRIPTION).toString();
    m_mapName = obj.value(JsonKeys::JSONKEY_MAPNAME).toString();
    m_slaveName = obj.value(JsonKeys::JSONKEY_SLAVENAME).toString();
    m_locked = obj.value(JsonKeys::JSONKEY_HASPASSWORD).toBool();
    m_uuid = obj.value(JsonKeys::JSONKEY_UUID).toString().toLongLong();
    m_currentPlayer = obj.value(JsonKeys::JSONKEY_CURRENTPLAYER).toString();
    m_runningGame = obj.value(JsonKeys::JSONKEY_RUNNINGGAME).toBool();
    QJsonArray usernames = obj.value(JsonKeys::JSONKEY_USERNAMES).toArray();
    for (const auto & username : usernames)
    {
        m_playerNames.append(username.toString());
    }
}

QString NetworkGameData::getMapName() const
{
    return m_mapName;
}

void NetworkGameData::setMapName(const QString &mapName)
{
    m_mapName = mapName;
}

QString NetworkGameData::getDescription() const
{
    return m_description;
}

void NetworkGameData::setDescription(const QString &value)
{
    m_description = value;
}

const QStringList &  NetworkGameData::getMods() const
{
    return m_Mods;
}

void NetworkGameData::setMods(const QStringList &Mods)
{
    m_Mods = Mods;
}

qint32 NetworkGameData::getMaxPlayers() const
{
    return m_maxPlayers;
}

void NetworkGameData::setMaxPlayers(const qint32 &maxPlayers)
{
    m_maxPlayers = maxPlayers;
}

qint32 NetworkGameData::getPlayers() const
{
    return m_players;
}

void NetworkGameData::setPlayers(const qint32 &players)
{
    m_players = players;
}

QString NetworkGameData::getSlaveName() const
{
    return m_slaveName;
}

void NetworkGameData::setSlaveName(const QString &slaveName)
{
    m_slaveName = slaveName;
}

bool NetworkGameData::getLaunched() const
{
    return m_launched;
}

void NetworkGameData::setLaunched(bool launched)
{
    m_launched = launched;
}

bool NetworkGameData::getLocked() const
{
    return m_locked;
}

void NetworkGameData::setLocked(bool locked)
{
    m_locked = locked;
}

const QStringList &  NetworkGameData::getPlayerNames() const
{
    return m_playerNames;
}

void NetworkGameData::setPlayerNames(const QStringList &playerNames)
{
    m_playerNames = playerNames;
}

qint64 NetworkGameData::getUuid() const
{
    return m_uuid;
}

void NetworkGameData::setUuid(qint64 newUuid)
{
    m_uuid = newUuid;
}

bool NetworkGameData::getRunningGame() const
{
    return m_runningGame;
}

void NetworkGameData::setRunningGame(bool newRunningGame)
{
    m_runningGame = newRunningGame;
}

QString NetworkGameData::getCurrentPlayer() const
{
    return m_currentPlayer;
}

void NetworkGameData::setCurrentPlayer(const QString & newCurrentPlayer)
{
    m_currentPlayer = newCurrentPlayer;
}

const QString &NetworkGameData::getSlaveSecondaryAddress() const
{
    return m_slaveSecondaryAddress;
}

void NetworkGameData::setSlaveSecondaryAddress(const QString &newSlaveSecondaryAddress)
{
    m_slaveSecondaryAddress = newSlaveSecondaryAddress;
}
