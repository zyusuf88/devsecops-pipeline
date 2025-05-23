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
import { SpaceBetween } from '@cloudscape-design/components';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Icon from '@cloudscape-design/components/icon';
import Link, { LinkProps } from '@cloudscape-design/components/link';
import { css } from '@emotion/react';
import { useMemo, FC, ReactNode } from 'react';
import { LEVEL_HIGH, LEVEL_LOW, LEVEL_MEDIUM, LEVEL_NOT_SET } from '../../../../../configs';
import { useAssumptionLinksContext } from '../../../../../contexts';
import { useMitigationLinksContext } from '../../../../../contexts/MitigationLinksContext';
import { useControlLinksContext } from '../../../../../contexts/ControlLinksContext';
import { useThreatsContext } from '../../../../../contexts/ThreatsContext';
import filterThreatsByMetadata from '../../../../../utils/filterThreatsByMetadata';
import useLinkClicked from '../../hooks/useLinkClicked';


const styles = {
  container: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
  contentContainer: css({
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
  }),
};

const NumberWithWarningSign: FC<{
  displayedNumber: number;
  onLinkClicked: LinkProps['onFollow'];
}> = ({ displayedNumber, onLinkClicked }) => {
  return displayedNumber > 0 ? (
    <SpaceBetween direction="horizontal" size="xxs">
      <Link variant="awsui-value-large" href="#" onFollow={onLinkClicked}>
        {displayedNumber}
      </Link>
      <Icon name="status-warning" variant="warning" />
    </SpaceBetween>
  ) : (
    <Link variant="awsui-value-large" href="#" onFollow={onLinkClicked}>
      {displayedNumber}
    </Link>
  );
};

const LabelValuePair: FC<{
  label: string | ReactNode;
  value: number;
  onLinkFollow: LinkProps['onFollow'];
  showWarning?: boolean;
}> = ({ label, value, onLinkFollow, showWarning }) => {
  return (<div css={styles.container} >
    <Box variant="awsui-key-label">{label}</Box>
    <div css={styles.contentContainer}>
      {showWarning ? (<NumberWithWarningSign displayedNumber={value} onLinkClicked={onLinkFollow} />) : (
        <Link
          variant="awsui-value-large"
          href="#"
          onFollow={onLinkFollow}
        >
          {value}
        </Link>)}
    </div>
  </div>);
};

const Overview: FC = () => {
  const { statementList } = useThreatsContext();
  const { mitigationLinkList } = useMitigationLinksContext();
  const { assumptionLinkList } = useAssumptionLinksContext();
  const { controlLinkList } = useControlLinksContext();

  const missingMitigationOrAssumption = useMemo(() => {
    return statementList.filter(
      (s) =>
        !mitigationLinkList.find((ml) => ml.linkedId === s.id) &&
        !assumptionLinkList.find((al) => al.linkedId === s.id),
    ).length;
  }, [statementList, mitigationLinkList, assumptionLinkList]);

  const handleLinkClicked = useLinkClicked();

  const missingMitigation = useMemo(() => {
    return statementList.filter(
      (s) => !mitigationLinkList.find((ml) => ml.linkedId === s.id),
    ).length;
  }, [statementList, mitigationLinkList]);

  const missingControl = useMemo(() => {
    return statementList.filter(
      (s) => !controlLinkList.find((ml) => ml.linkedId === s.id),
    ).length;
  }, [statementList, controlLinkList]);

  const missingPriority = useMemo(() => {
    return filterThreatsByMetadata(statementList, 'Priority').length;
  }, [statementList]);

  const countHigh = useMemo(() => {
    return filterThreatsByMetadata(statementList, 'Priority', LEVEL_HIGH)
      .length;
  }, [statementList]);

  const countMed = useMemo(() => {
    return filterThreatsByMetadata(statementList, 'Priority', 'Medium').length;
  }, [statementList]);

  const countLow = useMemo(() => {
    return filterThreatsByMetadata(statementList, 'Priority', 'Low').length;
  }, [statementList]);

  return (
    <ColumnLayout columns={8} variant="text-grid" minColumnWidth={100}>
      <LabelValuePair label='Total' value={statementList.length} onLinkFollow={handleLinkClicked()} />
      <LabelValuePair label='No mitigation and assumption'
        showWarning
        value={missingMitigationOrAssumption}
        onLinkFollow={handleLinkClicked({
          linkedMitigations: false,
          linkedAssumptions: false,
        })} />
      <LabelValuePair label='No security controls'
        showWarning
        value={missingControl}
        onLinkFollow={handleLinkClicked({
          linkedControls: false,
        })} />
      <LabelValuePair label='No mitigation'
        showWarning
        value={missingMitigation}
        onLinkFollow={handleLinkClicked({
          linkedMitigations: false,
        })} />
      <LabelValuePair label={<Badge color="red">High</Badge>}
        value={countHigh}
        onLinkFollow={handleLinkClicked({
          priority: LEVEL_HIGH,
        })} />
      <LabelValuePair label={<Badge color="blue">Med</Badge>}
        value={countMed}
        onLinkFollow={handleLinkClicked({
          priority: LEVEL_MEDIUM,
        })} />
      <LabelValuePair label={<Badge color="green">Low</Badge>}
        value={countLow}
        onLinkFollow={handleLinkClicked({
          priority: LEVEL_LOW,
        })} />
      <LabelValuePair label='Missing priority'
        showWarning
        value={missingPriority}
        onLinkFollow={handleLinkClicked({
          priority: LEVEL_NOT_SET,
        })} />
    </ColumnLayout>
  );
};

export default Overview;
