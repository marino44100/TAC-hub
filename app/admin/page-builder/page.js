'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
    Save,
    Eye,
    Settings,
    Type,
    Image,
    Layout,
    Monitor,
    Smartphone,
    Tablet,
    Trash2,
    Move,
    Edit3,
    Copy,
    Grid,
    Columns,
    Square,
    ArrowUp,
    ArrowDown
} from 'lucide-react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { useAuth } from '../../../contexts/AuthContext'

export default function PageBuilder() {
    const { user } = useAuth()
    const [components, setComponents] = useState([])
    const [selectedComponent, setSelectedComponent] = useState(null)
    const [previewMode, setPreviewMode] = useState(false)
    const [deviceView, setDeviceView] = useState('desktop')
    const [showPropertyPanel, setShowPropertyPanel] = useState(false)

    // Component library
    const componentLibrary = [{
            id: 'hero',
            name: 'Hero Section',
            icon: Layout,
            defaultProps: {
                title: 'Welcome to TAC-HUB',
                subtitle: 'Empowering Congo Basin Communities',
                backgroundImage: '/images/hero-bg.jpg',
                buttonText: 'Get Started',
                buttonLink: '/register'
            }
        },
        {
            id: 'text',
            name: 'Text Block',
            icon: Type,
            defaultProps: {
                content: 'Your text content here...',
                fontSize: 'text-base',
                textAlign: 'text-left',
                color: 'text-gray-900'
            }
        },
        {
            id: 'image',
            name: 'Image',
            icon: Image,
            defaultProps: {
                src: '/images/placeholder.jpg',
                alt: 'Image description',
                width: 'w-full',
                height: 'h-64'
            }
        },
        {
            id: 'button',
            name: 'Button',
            icon: Square,
            defaultProps: {
                text: 'Click Me',
                style: 'primary',
                link: '#'
            }
        },
        {
            id: 'columns',
            name: 'Columns',
            icon: Columns,
            defaultProps: {
                columnCount: 2,
                columns: [
                    { content: 'Column 1 content' },
                    { content: 'Column 2 content' }
                ]
            }
        }
    ]

    useEffect(() => {
        const savedComponents = localStorage.getItem('tac-hub-page-components')
        if (savedComponents) {
            setComponents(JSON.parse(savedComponents))
        }
    }, [])

    const addComponent = (componentType) => {
        const newComponent = {
            id: `${componentType.id}-${Date.now()}`,
            type: componentType.id,
            props: {...componentType.defaultProps }
        }
        setComponents([...components, newComponent])
    }

    const updateComponent = (componentId, newProps) => {
        setComponents(components.map(comp =>
            comp.id === componentId ? {...comp, props: {...comp.props, ...newProps } } :
            comp
        ))
    }

    const deleteComponent = (componentId) => {
        setComponents(components.filter(comp => comp.id !== componentId))
        setSelectedComponent(null)
    }

    const moveComponent = (componentId, direction) => {
        const index = components.findIndex(comp => comp.id === componentId)
        if (index === -1) return

        const newComponents = [...components]
        const newIndex = direction === 'up' ? index - 1 : index + 1

        if (newIndex >= 0 && newIndex < components.length) {
            [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]]
            setComponents(newComponents)
        }
    }

    const duplicateComponent = (componentId) => {
        const component = components.find(comp => comp.id === componentId)
        if (component) {
            const newComponent = {
                ...component,
                id: `${component.type}-${Date.now()}`
            }
            const index = components.findIndex(comp => comp.id === componentId)
            const newComponents = [...components]
            newComponents.splice(index + 1, 0, newComponent)
            setComponents(newComponents)
        }
    }

    const saveChanges = () => {
        localStorage.setItem('tac-hub-page-components', JSON.stringify(components))
        alert('Page saved successfully!')
    }

    const renderComponent = (component, isEditing = true) => {
        const { type, props } = component

        switch (type) {
            case 'hero':
                return ( <
                    div className = { `relative bg-cover bg-center py-20 px-6 text-white ${isEditing ? 'border-2 border-dashed border-blue-300' : ''}` }
                    style = {
                        { backgroundImage: `url(${props.backgroundImage})` }
                    } >
                    <
                    div className = "absolute inset-0 bg-black bg-opacity-50" > < /div> <
                    div className = "relative max-w-4xl mx-auto text-center" >
                    <
                    h1 className = "text-4xl md:text-6xl font-bold mb-4" > { props.title } < /h1> <
                    p className = "text-xl mb-8" > { props.subtitle } < /p> <
                    a href = { props.buttonLink }
                    className = "btn-primary" > { props.buttonText } <
                    /a> < /
                    div > <
                    /div>
                )

            case 'text':
                return ( <
                    div className = { `p-4 ${isEditing ? 'border-2 border-dashed border-blue-300' : ''}` } >
                    <
                    p className = { `${props.fontSize} ${props.textAlign} ${props.color}` } > { props.content } <
                    /p> < /
                    div >
                )

            case 'image':
                return ( <
                    div className = { `p-4 ${isEditing ? 'border-2 border-dashed border-blue-300' : ''}` } >
                    <
                    img src = { props.src }
                    alt = { props.alt }
                    className = { `${props.width} ${props.height} object-cover rounded-lg` }
                    /> < /
                    div >
                )

            case 'button':
                return ( <
                    div className = { `p-4 text-center ${isEditing ? 'border-2 border-dashed border-blue-300' : ''}` } >
                    <
                    a href = { props.link }
                    className = { `inline-block px-6 py-3 rounded-lg font-medium ${
                                props.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                                props.style === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' :
                                'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }` } > { props.text } <
                    /a> < /
                    div >
                )

            case 'columns':
                return ( <
                    div className = { `p-4 ${isEditing ? 'border-2 border-dashed border-blue-300' : ''}` } >
                    <
                    div className = { `grid grid-cols-${props.columnCount} gap-6` } > {
                        props.columns.map((column, index) => ( <
                            div key = { index }
                            className = "p-4 bg-gray-50 rounded-lg" >
                            <
                            p > { column.content } < /p> < /
                            div >
                        ))
                    } <
                    /div> < /
                    div >
                )

            default:
                return <div className = "p-4 bg-gray-100 text-center" > Unknown component type < /div>
        }
    }

    if (!user || user.role !== 'admin') {
        return ( <
            div className = "min-h-screen bg-gray-50" >
            <
            Header / >
            <
            div className = "container-max py-12" >
            <
            div className = "text-center" >
            <
            h1 className = "text-2xl font-bold text-gray-900 mb-4" > Access Denied < /h1> <
            p className = "text-gray-600 mb-6" > You need administrator privileges to access the page builder. < /p> <
            a href = "/login"
            className = "btn-primary" > Login as Admin < /a> < /
            div > <
            /div> <
            Footer / >
            <
            /div>
        )
    }

    return ( <
            div className = "min-h-screen bg-gray-100" >
            <
            Header / >

            <
            div className = "flex h-screen" > { /* Component Library Sidebar */ } <
            div className = "w-80 bg-white border-r border-gray-200 overflow-y-auto" >
            <
            div className = "p-4 border-b border-gray-200" >
            <
            h2 className = "text-lg font-semibold text-gray-900" > Page Builder < /h2> <
            p className = "text-sm text-gray-600" > Click components to add them < /p> < /
            div >

            { /* Toolbar */ } <
            div className = "p-4 border-b border-gray-200" >
            <
            div className = "flex space-x-2 mb-4" >
            <
            button onClick = { saveChanges }
            className = "flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" >
            <
            Save className = "w-4 h-4" / >
            <
            span > Save < /span> < /
            button > <
            button onClick = {
                () => setPreviewMode(!previewMode)
            }
            className = "flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
            <
            Eye className = "w-4 h-4" / >
            <
            span > Preview < /span> < /
            button > <
            /div>

            { /* Device View Toggle */ } <
            div className = "flex space-x-1 bg-gray-100 rounded-lg p-1" >
            <
            button onClick = {
                () => setDeviceView('desktop')
            }
            className = { `flex items-center space-x-1 px-2 py-1 rounded ${deviceView === 'desktop' ? 'bg-white shadow-sm' : ''}` } >
            <
            Monitor className = "w-4 h-4" / >
            <
            /button> <
            button onClick = {
                () => setDeviceView('tablet')
            }
            className = { `flex items-center space-x-1 px-2 py-1 rounded ${deviceView === 'tablet' ? 'bg-white shadow-sm' : ''}` } >
            <
            Tablet className = "w-4 h-4" / >
            <
            /button> <
            button onClick = {
                () => setDeviceView('mobile')
            }
            className = { `flex items-center space-x-1 px-2 py-1 rounded ${deviceView === 'mobile' ? 'bg-white shadow-sm' : ''}` } >
            <
            Smartphone className = "w-4 h-4" / >
            <
            /button> < /
            div > <
            /div>

            { /* Component Library */ } <
            div className = "p-4" >
            <
            h3 className = "text-sm font-medium text-gray-700 mb-3" > Components < /h3> <
            div className = "space-y-2" > {
                componentLibrary.map((component) => ( <
                    button key = { component.id }
                    onClick = {
                        () => addComponent(component)
                    }
                    className = "w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" >
                    <
                    component.icon className = "w-5 h-5 text-gray-600" / >
                    <
                    span className = "text-sm font-medium text-gray-900" > { component.name } < /span> < /
                    button >
                ))
            } <
            /div> < /
            div > <
            /div>

            { /* Main Canvas Area */ } <
            div className = "flex-1 overflow-y-auto" > { /* Property Panel */ } {
                showPropertyPanel && selectedComponent && ( <
                        div className = "fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto" >
                        <
                        div className = "p-4 border-b border-gray-200" >
                        <
                        div className = "flex items-center justify-between" >
                        <
                        h3 className = "text-lg font-semibold" > Properties < /h3> <
                        button onClick = {
                            () => setShowPropertyPanel(false)
                        }
                        className = "text-gray-400 hover:text-gray-600 text-xl" > ×
                        <
                        /button> < /
                        div > <
                        /div>

                        <
                        div className = "p-4 space-y-4" > {
                            selectedComponent.type === 'hero' && ( <
                                >
                                <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Title < /label> <
                                input type = "text"
                                value = { selectedComponent.props.title }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { title: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Subtitle < /label> <
                                textarea value = { selectedComponent.props.subtitle }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { subtitle: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows = "3" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Button Text < /label> <
                                input type = "text"
                                value = { selectedComponent.props.buttonText }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { buttonText: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Button Link < /label> <
                                input type = "text"
                                value = { selectedComponent.props.buttonLink }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { buttonLink: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> < /
                                >
                            )
                        }

                        {
                            selectedComponent.type === 'text' && ( <
                                >
                                <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Content < /label> <
                                textarea value = { selectedComponent.props.content }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { content: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows = "4" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Font Size < /label> <
                                select value = { selectedComponent.props.fontSize }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { fontSize: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                                <
                                option value = "text-sm" > Small < /option> <
                                option value = "text-base" > Medium < /option> <
                                option value = "text-lg" > Large < /option> <
                                option value = "text-xl" > Extra Large < /option> <
                                option value = "text-2xl" > 2 X Large < /option> < /
                                select > <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Text Alignment < /label> <
                                select value = { selectedComponent.props.textAlign }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { textAlign: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                                <
                                option value = "text-left" > Left < /option> <
                                option value = "text-center" > Center < /option> <
                                option value = "text-right" > Right < /option> < /
                                select > <
                                /div> < /
                                >
                            )
                        }

                        {
                            selectedComponent.type === 'button' && ( <
                                >
                                <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Button Text < /label> <
                                input type = "text"
                                value = { selectedComponent.props.text }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { text: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Link < /label> <
                                input type = "text"
                                value = { selectedComponent.props.link }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { link: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Style < /label> <
                                select value = { selectedComponent.props.style }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { style: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                                <
                                option value = "primary" > Primary < /option> <
                                option value = "secondary" > Secondary < /option> <
                                option value = "outline" > Outline < /option> < /
                                select > <
                                /div> < /
                                >
                            )
                        }

                        {
                            selectedComponent.type === 'image' && ( <
                                >
                                <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Image URL < /label> <
                                input type = "text"
                                value = { selectedComponent.props.src }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { src: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> <
                                div >
                                <
                                label className = "block text-sm font-medium text-gray-700 mb-1" > Alt Text < /label> <
                                input type = "text"
                                value = { selectedComponent.props.alt }
                                onChange = {
                                    (e) => updateComponent(selectedComponent.id, { alt: e.target.value })
                                }
                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                                >
                                <
                                /div> < /
                                >
                            )
                        }

                        {
                            selectedComponent.type === 'columns' && ( <
                                    >
                                    <
                                    div >
                                    <
                                    label className = "block text-sm font-medium text-gray-700 mb-1" > Number of Columns < /label> <
                                    select value = { selectedComponent.props.columnCount }
                                    onChange = {
                                        (e) => {
                                            const count = parseInt(e.target.value)
                                            const newColumns = Array(count).fill().map((_, i) =>
                                                selectedComponent.props.columns[i] || { content: `Column ${i + 1} content` }
                                            )
                                            updateComponent(selectedComponent.id, { columnCount: count, columns: newColumns })
                                        }
                                    }
                                    className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                                    <
                                    option value = "1" > 1 Column < /option> <
                                    option value = "2" > 2 Columns < /option> <
                                    option value = "3" > 3 Columns < /option> <
                                    option value = "4" > 4 Columns < /option> < /
                                    select > <
                                    /div> {
                                    selectedComponent.props.columns.map((column, index) => ( <
                                        div key = { index } >
                                        <
                                        label className = "block text-sm font-medium text-gray-700 mb-1" > Column { index + 1 }
                                        Content < /label> <
                                        textarea value = { column.content }
                                        onChange = {
                                            (e) => {
                                                const newColumns = [...selectedComponent.props.columns]
                                                newColumns[index] = {...newColumns[index], content: e.target.value }
                                                updateComponent(selectedComponent.id, { columns: newColumns })
                                            }
                                        }
                                        className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows = "3" /
                                        >
                                        <
                                        /div>
                                    ))
                                } <
                                />
                        )
                    } <
                    /div> < /
                    div >
            )
        } <
        div className = { `mx-auto bg-white min-h-full ${
                        deviceView === 'desktop' ? 'max-w-none' :
                        deviceView === 'tablet' ? 'max-w-3xl' :
                        'max-w-sm'
                    }` } > {!previewMode && ( <
                div className = "bg-blue-50 p-4 text-center border-b" >
                <
                p className = "text-sm text-blue-700" >
                <
                Edit3 className = "w-4 h-4 inline mr-1" / >
                Editing Mode - Click components from the sidebar to add them <
                /p> < /
                div >
            )
        }

    <
    div className = "min-h-96" > {
            components.length === 0 ? ( <
                div className = "text-center py-20" >
                <
                Layout className = "w-16 h-16 text-gray-300 mx-auto mb-4" / >
                <
                h3 className = "text-lg font-medium text-gray-900 mb-2" > Start Building Your Page < /h3> <
                p className = "text-gray-600" > Click components from the sidebar to get started < /p> < /
                div >
            ) : (
                components.map((component, index) => ( <
                    div key = { component.id }
                    className = "relative group"
                    onClick = {
                        () => {
                            setSelectedComponent(component)
                            setShowPropertyPanel(true)
                        }
                    } > {!previewMode && ( <
                            div className = "absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" >
                            <
                            div className = "flex space-x-1" >
                            <
                            button onClick = {
                                (e) => {
                                    e.stopPropagation()
                                    moveComponent(component.id, 'up')
                                }
                            }
                            className = "p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            title = "Move Up"
                            disabled = { index === 0 } >
                            <
                            ArrowUp className = "w-3 h-3" / >
                            <
                            /button> <
                            button onClick = {
                                (e) => {
                                    e.stopPropagation()
                                    moveComponent(component.id, 'down')
                                }
                            }
                            className = "p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            title = "Move Down"
                            disabled = { index === components.length - 1 } >
                            <
                            ArrowDown className = "w-3 h-3" / >
                            <
                            /button> <
                            button onClick = {
                                (e) => {
                                    e.stopPropagation()
                                    duplicateComponent(component.id)
                                }
                            }
                            className = "p-1 bg-green-600 text-white rounded hover:bg-green-700"
                            title = "Duplicate" >
                            <
                            Copy className = "w-3 h-3" / >
                            <
                            /button> <
                            button onClick = {
                                (e) => {
                                    e.stopPropagation()
                                    deleteComponent(component.id)
                                }
                            }
                            className = "p-1 bg-red-600 text-white rounded hover:bg-red-700"
                            title = "Delete" >
                            <
                            Trash2 className = "w-3 h-3" / >
                            <
                            /button> < /
                            div > <
                            /div>
                        )
                    } { renderComponent(component, !previewMode) } <
                    /div>
                ))
            )
        } <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>
)
}