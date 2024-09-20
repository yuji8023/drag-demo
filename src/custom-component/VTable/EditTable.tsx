import React, { useState } from "react";

import { Button, message, Input } from "antd";
import classNames from "classnames";


export default function EditTable(props: any) {
    const { value:tableData, onChange } = props;
    const [canEdit, setCanEdit] = useState(false);
    const [curProperty, setCurProperty] = useState('');
    const [curTd, setCurTd] = useState('');
    const [preCurTd, setPreCurTd] = useState('');
    const onDblclick = () => {
        setCanEdit(true)
    }

    const onTdClick = (row, col) => {
        // this.curTd = `${row},${col}`
        // this.preCurTd = this.curTd
        setCurTd(`${row},${col}`)
        setPreCurTd(curTd)
    }
  
    const onBlur = () => {
        setCanEdit(false)
        setCurTd('')
    }

    const deleteRow = () => {
        if (!preCurTd) {
          message.error('请先选择要删除的行')
          return
        }
  
        const row = preCurTd.split(',')[0];
        const copyData = [...tableData]
        copyData.splice(Number(row), 1)
        onChange(copyData)
      }
  
      const addRow = () => {
        const copyData = [...tableData]
        copyData.push(new Array(copyData[0]?.length || 1).fill(' '))
        onChange(copyData)
      }
  
      const addCol = () => {
        const copyData = [...tableData]
        if (copyData.length) {

            copyData.forEach((item) => item.push(' '))

        } else {
            copyData.push([' '])
        }
        onChange(copyData)
      }
  
      const deleteCol = () => {
        if (!preCurTd) {
          message.error('请先选择要删除的列')
          return
        }
  
        const col = preCurTd.split(',')[1]
        const copyData = [...tableData]
        copyData.forEach((item) => {
          item.splice(col, 1)
        })
        onChange(copyData)
      }

    return (<div className="dg-edit-table">
        <table onDoubleClick={onDblclick}>
          <tbody>
            {
                tableData.map((item, index) => {
                    return <tr key={index}>
                        {item.map((e, col) => {
                            return <td className={classNames('col', {'selected': curTd === index})} key={col} onClick={() => {
                                onTdClick(index, col)
                            }}>
                                {
                                    canEdit && curTd === index  ? <Input value={tableData[index][col]} onBlur={onBlur} /> : <span>{e}</span>
                                }
                            </td>
                        })}
                    </tr>
                })
            }
          </tbody>
        </table>
        <div>
          <Button onClick={addRow}>添加新行</Button>
          <Button onClick={addCol}>添加新列</Button>
          <Button onClick={deleteRow}>删除行</Button>
          <Button onClick={deleteCol}>删除列</Button>
        </div>
      </div>)
}