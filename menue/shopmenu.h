#ifndef SHOPMENU_H
#define SHOPMENU_H

#include <QObject>

#include "oxygine-framework.h"

#include "objects/base/panel.h"
#include "coreengine/userdata.h"
#include "objects/base/label.h"

class Shopmenu : public QObject, public oxygine::Actor
{
    Q_OBJECT
public:
    explicit Shopmenu();

signals:
    void sigExitMenue();
    void sigUpdateItemCosts(qint32 costChange);
    void sigBuy();
public slots:
    /**
     * @brief exitMenue
     */
    void exitMenue();
    /**
     * @brief filterChanged
     * @param item
     */
    void filterChanged(qint32 item);
    /**
     * @brief buy
     */
    void buy();
private:
    QVector<Userdata::ShopItem> getItems(qint32 itemType);
    void updateItemCosts(qint32 costChange);
    oxygine::spSprite getIcon(GameEnums::ShopItemType itemType);
    void loadWikiInfo(oxygine::spButton pIcon, GameEnums::ShopItemType itemType, QString key);
private:
    spPanel m_pPanel;
    QVector<bool> m_shoppingList;
    qint32 m_pointCosts{0};
    spLabel m_points;
    spLabel m_costs;
    oxygine::spButton  m_buyButton;
    qint32 m_currentFilter{0};
};

#endif // SHOPMENU_H
