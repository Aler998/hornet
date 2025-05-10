import { useState, useCallback, ReactNode } from 'react';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from '../../theme/components/iconify';
import { IconButton } from '@mui/material';


type TableRowProps = {
  children: ReactNode;
  selected: boolean;
  onSelectRow: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onShow?: () => void;
};

export function DefaultTableRow({ children, selected, onSelectRow, onDelete, onEdit, onShow }: TableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  let editButton = <></>;
  let showButton = <></>;
  let deleteButton = <></>;

  if (onEdit != undefined) {
    const handleEdit = () => {
      handleClosePopover()
      onEdit()
    }

    editButton = <MenuItem onClick={handleEdit}>
      <Iconify icon="solar:pen-bold" />
      Edit
    </MenuItem>
  }
  if (onShow != undefined) {
    const handleShow = () => {
      handleClosePopover()
      onShow()
    }

    showButton = <MenuItem onClick={handleShow}>
      <Iconify icon="solar:eye-bold" />
      Show
    </MenuItem>
  }
  if (onDelete != undefined) {
    const handleDelete = () => {
      handleClosePopover()
      onDelete()
    }

    deleteButton = <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
      <Iconify icon="solar:trash-bin-trash-bold" />
      Delete
    </MenuItem>
  }



  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        {children}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          {showButton}

          {editButton}

          {deleteButton}
        </MenuList>
      </Popover>
    </>
  );
}
