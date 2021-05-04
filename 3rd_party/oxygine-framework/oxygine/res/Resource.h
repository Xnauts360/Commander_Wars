#pragma once
#include "3rd_party/oxygine-framework/oxygine/oxygine-include.h"
#include "3rd_party/oxygine-framework/oxygine/core/Object.h"
#include "QDomDocument"

namespace oxygine
{
    DECLARE_SMART(Resource, spResource);
    class Resource: public Object
    {
    public:
        Resource();
        ~Resource();

        /**Loads resource heavy data into memory*/
        void load(LoadResourcesContext* context = 0);
        /**Unloads heavy data from memory.
        All internal Objects (fonts, textures, sounds etc) remain valid but not usable (can't be displayed, played etc).
        */
        void unload();

        /**Returns any attribute from xml resource definition. You could use it for defining for example per animation constants like duration, specific offsets, delays.*/
        QString             getAttribute(QString attr) const;
        QDomElement         getNode() const {return _node;}
        bool                getUseLoadCounter() const {return _useLoadCounter;}
        qint32                 getLoadCounter() const { return _loadCounter; }
        Resource*           getParent() const {return _parent;}


        void setUseLoadCounter(bool v) {_useLoadCounter = v;}
        void setParent(Resource* p) {_parent = p;}

        /**returns id from xml node. Function is helper*/
        static QString extractID(const QDomElement& node, QString file, QString def);
        static QString extractID(QString file);

        virtual void setLinearFilter(quint32)
        {
        }
        virtual quint32 getLinearFilter() const
        {
            return 0;
        }
    protected:
        static void setNode(spResource res, const QDomElement& node) {res->_node = node;}

        virtual void _load(LoadResourcesContext* context = 0) = 0;
        virtual void _unload() = 0;

        Resource* _parent;

        qint32 _loadCounter;
        bool _useLoadCounter;

        QDomElement _node;

    private:
        //non copyable
        Resource(const Resource&);
        const Resource& operator=(const Resource&);
    };
}
