create or replace function get_user_balance (uid UUID)
returns table (
	earnings numeric (10,2),
	expenses numeric (10,2),
	balance numeric (10,2)
) as $$
begin 
	return query
	select 
		coalesce(sum(t1.earning),0) as earnings,
		coalesce(sum(t1.expense),0) as expenses,
		coalesce(sum(t1.earning),0) - coalesce(sum(t1.expense),0) as balance
	from (
		select 
			t.user_id,
			(
				case 
					when type = 'EARNING' then t.amount
					else 0
				end
			) as earning,
			(
				case 
					when type = 'EXPENSE' then t.amount
					else 0
				end
			) as expense
		from transactions t 
		where t.user_id = uid
	) as t1;
end; $$
language plpgsql;