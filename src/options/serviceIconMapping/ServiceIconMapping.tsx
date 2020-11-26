import React from 'react';
import {  remove} from 'lodash';
import { StandardEditorProps } from '@grafana/data';
import { PanelSettings } from '../../types';


interface Props extends StandardEditorProps<string, PanelSettings> {}

function addMapping(context: any, onChange: any, item: any) {
    context.options.serviceIcons.push({ pattern: 'my-type', filename: 'default' })
    onChange.call(item.path, context.options.serviceIcons)
}

function removeMapping(context: any, index:any, onChange: any, item: any) {
    remove(context.options.serviceIcons, n => context.options.serviceIcons.indexOf(n) == index)
    onChange.call(item.path, context.options.serviceIcons)
}

function setPatternValue(context: any, event: any, index: any, onChange: any, item: any) {
    context.options.serviceIcons[index].pattern = event.currentTarget.value
    onChange.call(item.path, context.options.serviceIcons)
}

function setIconValue(context: any, event: any, index: any, onChange: any, item: any) {
    context.options.serviceIcons[index].icon = event.currentTarget.value
    onChange.call(item.path, context.options.serviceIcons)
}

export const ServiceIconMapping: React.FC<Props> = ({ item, value, onChange, context }) => {
    if(!value || value === undefined) {
        context.options.serviceIcons = [{ pattern: 'my-type', filename: 'default' }]
    }
    
    var componentList = []
    for (const [index] of context.options.serviceIcons.entries()) {
        componentList.push(
            <div>
                <div className="gf-form">
                    <input type="text" className="input-small gf-form-input width-10"
                        value = {context.options.serviceIcons[index].pattern}
                        onChange={e => setPatternValue(context, e, index, onChange, item)} />

                    <select className="input-small gf-form-input width-10"
                        value = {context.options.serviceIcons[index].fileName}>
                        onChange={(e: any) => setIconValue(context, e, index, onChange, item)}
                        <option ng-repeat="variable in editor.getServiceIconOptions()" value="{{variable}}">
                        </option>
                    </select>

                    <a className="gf-form-label tight-form-func" onClick = {e => removeMapping(context, index, onChange, item)}><i
                            className="fa fa-trash"></i></a>
                </div>
            </div>
        )
      }
    return (
        <div>
            <div className="gf-form-inline">
            <div className="gf-form">
                <label className="gf-form-label width-10">Target Name (RegEx)</label>
                <label className="gf-form-label width-10">Icon</label>
            </div>
            </div>
            <div>
                {componentList}
            </div>
            <button className="btn navbar-button navbar-button--primary" onClick={e => addMapping(context, onChange, item)}>Add Service Icon Mapping</button>
        </div>
    )
}
