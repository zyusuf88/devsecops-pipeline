/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */

/** @jsxImportSource @emotion/react */
import Button from '@cloudscape-design/components/button';
import { TextareaProps } from '@cloudscape-design/components/textarea';
import { FC, useCallback, forwardRef, useRef, RefObject, useImperativeHandle } from 'react';
import { useThreatsContext } from '../../../contexts/ThreatsContext';
import { TemplateThreatStatementSchema } from '../../../customTypes';
import Textarea from '../../generic/Textarea';
import EditorLayout from '../EditorLayout';
import styles from '../EditorLayout/styles';
import ExampleList from '../ExampleList';
import { EditorProps } from '../ThreatStatementEditor/types';

const EditorThreatAction: FC<EditorProps> = forwardRef<TextareaProps.Ref, EditorProps>(({
  statement, setStatement, fieldData,
}, ref) => {
  const inputRef = useRef<TextareaProps.Ref>();
  const { perFieldExamples } = useThreatsContext();

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus();
      },
    };
  }, []);

  const handleChange = useCallback((threatAction: string) => {
    setStatement(prevStatement => prevStatement && ({
      ...prevStatement,
      threatAction: threatAction,
    }));
  }, [setStatement]);

  const handleSelect = useCallback((threatAction: string) => {
    handleChange(threatAction);
    inputRef.current?.focus();
  }, [handleChange]);

  return (<EditorLayout
    title={fieldData.displayTitle}
    description={fieldData.description}
  >
    <div css={styles.textEditorLayout}>
      <div css={styles.input}>
        <Textarea
          ref={inputRef as RefObject<TextareaProps.Ref>}
          spellcheck
          onChange={({ detail }) => handleChange(detail.value)}
          value={statement.threatAction || ''}
          placeholder="Enter threat action"
          validateData={TemplateThreatStatementSchema.shape.threatAction.safeParse}
          rows={2}
          singleLine
          stretch
        />
      </div>
      {statement.threatAction && <div css={styles.inputClear}>
        <Button variant='icon' iconName='close' onClick={() => handleChange('')} />
      </div>}
    </div>
    {perFieldExamples.threat_action.length > 0 &&
      <ExampleList examples={perFieldExamples.threat_action} onSelect={handleSelect}></ExampleList>}
  </EditorLayout>);
});

export default EditorThreatAction;
