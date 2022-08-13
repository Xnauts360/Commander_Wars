#pragma once
#include "3rd_party/oxygine-framework/oxygine/oxygine-forwards.h"
#include "3rd_party/oxygine-framework/oxygine/core/Object.h"

#ifdef GRAPHICSUPPORT
#include <QOpenGLShader>
#endif

namespace oxygine
{
    class ShaderProgram;
    using spShaderProgram = oxygine::intrusive_ptr<ShaderProgram>;
    class ShaderProgram: public Object
    {
    public:
        explicit ShaderProgram(const QString & vsShader, const QString & fsShader, const VertexDeclaration* decl);
        virtual ~ShaderProgram() = default;
        void bind();
        quint32 getID() const;
        qint32 getUniformLocation(const char* id) const;
    protected:
#ifdef GRAPHICSUPPORT
        void compileShader(QOpenGLShader& shader, const QString & data);
#endif
    private:
#ifdef GRAPHICSUPPORT
        QOpenGLShaderProgram m_program;
        QOpenGLShader m_vsShader;
        QOpenGLShader m_fsShader;
#endif
    };
}
