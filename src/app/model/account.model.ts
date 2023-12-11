export interface AccountDetails {
  accountId:        string;
  balance:          number;
  currentPage:      number;
  totalPages:       number;
  pageSize:         number;
  operationDTOList: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  operationtype: string;
  description:   string;
}
