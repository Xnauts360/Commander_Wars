#ifndef TERRAINMANAGER_H
#define TERRAINMANAGER_H

#include "resource_management/ressourcemanagement.h"

class TerrainManager : public QObject, public RessourceManagement<TerrainManager>
{
    Q_OBJECT
public:
    /**
     * @brief getTerrainGroup
     * @param i
     * @return
     */
    qint32 getTerrainGroup(qint32 i);
    /**
     * @brief getTerrainGroup
     * @param id
     * @return
     */
    qint32 getTerrainGroup(QString id);
    /**
     * @brief getTerrainGroupName
     * @param group
     * @return
     */
    QString getTerrainGroupName(qint32 group);
public slots:
    void removeRessource(QString id);
    /**
     * @brief getTerrainsSorted
     * @return
     */
    QStringList getTerrainsSorted();
    /**
     * @brief getCount
     * @return
     */
    qint32 getTerrainCount()
    {
        return m_loadedRessources.size();
    }
    /**
     * @brief getFittingResAnim
     * @param spriteIdStart
     * @param spriteIdEnd
     * @return
     */
    QString getFittingResAnim(QString spriteIdStart, QString spriteIdEnd) const;
protected:
    friend RessourceManagement<TerrainManager>;
    TerrainManager();
private:
    virtual ~TerrainManager() = default;
};

#endif // TERRAINMANAGER_H
